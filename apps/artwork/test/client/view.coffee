_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
Artist = require '../../../../models/artist'
Artists = require '../../../../collections/artists'
Artwork = require '../../../../models/artwork'
CurrentUser = require '../../../../models/current_user'

describe 'ArtworkView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->

    # Interestingly: jQuery "Every attempt is made to convert the string to a
    # JavaScript value (this includes booleans, numbers, objects, arrays, and null)"
    # and we're using numeric-looking strings for fabricated artwork image IDs.
    edition_sets = _.times(2, -> fabricate('edition_set', forsale: true, acquireable: true))
    artwork = fabricate('artwork', can_share_image: true, edition_sets: edition_sets, acquireable: true, artists: [{id: 'artist', artworks_count: 2}], artist: {id: 'artist', artworks_count: 2})

    _.each (artwork).images, (image) ->
      image.id = _.uniqueId('stringy')
    @artwork = new Artwork(artwork, parse: true)
    @artists = @artwork.related().artists
    @artist = @artwork.related().artist

    sinon.stub @artist.related().artworks, 'fetch'

    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd: {}
      artist: @artist
      artwork: @artwork
      artists: @artists
      asset: (->)
    }, =>
      @ArtworkView = mod = benv.requireWithJadeify(
        (resolve __dirname, '../../client/view'),
        ['detailTemplate', 'auctionPlaceholderTemplate', 'actionsTemplate']
      )
      @ArtworkView.__set__ 'analytics', { abTest: sinon.stub(), delta: sinon.stub(), track: { click: sinon.stub() } }
      @ArtworkView.__set__ 'ShareModal', (@shareViewStub = sinon.stub())
      @ArtworkView.__set__ 'acquireArtwork', (@acquireArtworkStub = sinon.stub())
      @ArtworkView.__set__ 'RelatedNavigationView', Backbone.View
      @ArtworkView.__set__ 'EmbeddedInquiryView', Backbone.View

      stubChildClasses mod, @, ['VideoView'], []

      @artworkColumnsView = { appendArtworks: sinon.stub() }
      @ArtworkColumnsView = sinon.stub()
      @ArtworkColumnsView.returns @artworkColumnsView
      @ArtworkView.__set__ 'ArtworkColumnsView', @ArtworkColumnsView

      @renderDetailSpy = sinon.spy @ArtworkView::, 'renderDetail'
      @afterSalesFetchSpy = sinon.spy @ArtworkView::, 'afterSalesFetch'
      done()

  afterEach ->
    Backbone.sync.restore()
    @artist.related().artworks.fetch.restore()
    @renderDetailSpy.restore()
    @afterSalesFetchSpy.restore()

  describe 'user logged in', ->
    beforeEach ->
      @ArtworkView.__set__ 'CurrentUser', { orNull: -> new CurrentUser(fabricate 'user') }
      @ArtworkView.__set__ 'analytics', { track: { impression: (->), click: (->), funnel: (->) } , abTest: (->) }
      @view = new @ArtworkView el: $('#artwork-page'), artwork: @artwork
      @artwork.related().sales.trigger 'sync', @artwork.related().sales

    describe '#checkQueryStringForAuction', ->
      it 'renders the auction placeholder when an auction_id is in the query string', ->
        @view.$el.html().should.not.containEql 'Bid'
        @view.location = search: '?auction_id=my-sale-id'
        @view.checkQueryStringForAuction()
        html = @view.$el.html()
        html.should.containEql 'my-sale-id'
        html.should.containEql 'Bid'

      describe 'artwork is already sold', ->
        it 'does not render the auction placeholder', ->
          @artwork.set 'sold', true
          @view.location = search: '?auction_id=my-sale-id'
          @view.checkQueryStringForAuction()
          html = @view.$el.html()
          html.should.not.containEql 'my-sale-id'
          html.should.not.containEql 'Bid'

    describe 'when an artwork changes', ->
      it 'only renders if the artwork sale_message changes', ->
        @renderDetailSpy.called.should.not.be.ok()
        @view.artwork.set 'sale_message', 'SOLD'
        @renderDetailSpy.called.should.be.ok()
        @afterSalesFetchSpy.called.should.be.ok()

      it 'only renders if the artwork ecommerce changes', ->
        @renderDetailSpy.called.should.not.be.ok()
        @view.artwork.set 'ecommerce', true
        @renderDetailSpy.called.should.be.ok()

    describe '#initialize', ->
      it 'has an artist and an artwork', ->
        @view.artwork.id.should.equal @artwork.id
        @view.artist.id.should.equal @artist.id

      it 'has a following collection if the user is logged in', ->
        _.isUndefined(@view.following).should.not.be.ok()

    describe '#setupCurrentUser', ->
      it 'initializes the current user, saved artwork collection, and following collection', ->
        _.isUndefined(@view.currentUser).should.not.be.ok()
        _.isUndefined(@view.saved).should.not.be.ok()
        _.isUndefined(@view.following).should.not.be.ok()

    describe '#setupArtistArtworks', ->
      it 'fetches a sample of the artwork artist\'s works', ->
        @artist.related().artworks.fetch.callCount.should.equal 1

    describe '#renderArtistArtworks', ->
      it 'renders the artist\'s artworks', ->
        @artist.related().artworks.add([fabricate 'artwork'])
        @artist.related().artworks.trigger 'sync'

        @artist.related().artworks.pluck('id').should.not.containEql @artwork.id

    describe '#openShare', ->
      it 'opens the share view when the share button is clicked', ->
        @view.$('.circle-icon-button-share').click()
        @shareViewStub.args[0][0].description.should.containEql @artwork.toAltText()
        @shareViewStub.args[0][0].width.should.equal '350px'

    describe '#route', ->
      it 'transitions the state of the el with data attributes', ->
        @view.$el.attr('data-route').should.equal 'show'
        @view.route('more-info')
        @view.$el.attr('data-route-pending').should.equal 'more-info'
        @view.$el.attr('data-route').should.equal 'more-info'

    describe '#changeImage', ->
      beforeEach ->
        @$imageLink = @view.$('.artwork-additional-image.is-inactive').first()
        # The artwork images are fabricated with identical links
        # so lets change that
        @$imageLink.data('href', 'foobar')
        @$imageLink.click()

        @view.$('#the-artwork-image').attr('src').
          should.equal 'foobar'

        @view.artwork.activeImage().id.should.equal @$imageLink.data('id')

        @$imageLink.hasClass('is-active').should.be.ok()

    describe '#setupFollowButtons', ->
      it 'syncs the following collection with the artist id', ->
        syncFollowsSpy = sinon.spy @view.following, 'syncFollows'
        @view.setupFollowButtons()
        syncFollowsSpy.args[0][0].should.containEql @artist.id

    describe '#setupVideoView', ->
      it 'doesnt do anything for non-video artworks', ->
        @view.artwork.set category: 'Painting'
        @view.setupVideoView()
        @VideoView.called.should.not.be.ok()
      it 'inits a video view for video artworks', ->
        @view.artwork.set category: 'Video', website: 'youtube.com/foobar'
        @view.setupVideoView()
        @VideoView.called.should.be.ok()

    describe '#selectEdition', ->
      it 'sets a private value on the view that is otherwise undefined', ->
        _.isUndefined(@view.__selectedEdition__).should.be.ok()
        @view.$('.aes-radio-button').last().trigger('change')
        @view.__selectedEdition__.should.equal @artwork.editions.last().id

    describe '#selectedEdition', ->
      it 'should default to the first edition id', ->
        @view.selectedEdition().should.equal @artwork.editions.first().id
      it 'should favor the __selectedEdition__ if it has changed', ->
        @view.selectEdition(currentTarget: value: @artwork.editions.last().id)
        @view.selectedEdition().should.equal @artwork.editions.last().id

    describe '#buy', ->
      it 'should pass in the correct arguments when the buy button is clicked', ->
        ($target = @view.$('.artwork-buy-button')).click()
        @acquireArtworkStub.called.should.be.ok()
        @acquireArtworkStub.args[0][0].should.equal @artwork
        @acquireArtworkStub.args[0][1].text().should.equal $target.text()
        @acquireArtworkStub.args[0][2].should.equal @view.selectedEdition()

  describe 'user logged out', ->
    beforeEach ->
      @ArtworkView.__set__ 'CurrentUser', { orNull: -> null }
      @ArtworkView.__set__ 'analytics', { track: { impression: (->), click: (->) } , abTest: -> }
      @view = new @ArtworkView el: $('#artwork-page'), artist: @artist, artwork: @artwork, artists: @artists

    describe '#initialize', ->
      it 'does not have a following collection if the user is not logged in', ->
        _.isUndefined(@view.following).should.be.ok()

    describe '#displayZigZag', ->
      beforeEach ->
        @view.$el.append $('<div class="js-send-embedded-inquiry"></div>')
      it 'should display as long as the work is not acquireable and it is for sale', ->
        @view.artwork.set { 'acquireable': false, 'forsale': true}
        @view.displayZigZag().should.be.true()
        @view.artwork.set { 'acquireable': true, 'forsale': true}
        @view.displayZigZag().should.be.false()
        @view.artwork.set { 'acquireable': false, 'forsale': false}
        @view.displayZigZag().should.be.false()
        @view.artwork.set { 'acquireable': true, 'forsale': false}
        @view.displayZigZag().should.be.false()
