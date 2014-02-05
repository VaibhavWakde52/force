{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Shortcut = require '../../../models/shortcut.coffee'

describe 'Shortcut routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'shortcut' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the artist template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success { short: 'shortcut', long: 'https://long-url.com' }
      @res.redirect.args[0][0].should.equal 'https://long-url.com'
