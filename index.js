var viewmodel = {
  list: ko.observableArray([{
    id: 1,
    name: 1
  }, {
    id: 2,
    name: 2
  }, {
    id: 3,
    name: 3
  }, {
    id: 4,
    name: 4
  }]),
  outterAttr: ko.observable('outterAttr'),
  childrenCompletecallback: function (data) {
    var el = document.getElementById('test')
    console.log("after:" + el.innerHTML)
  },
  code2: '<div data-bind="childrenComplete:childrenCompletecallback">\
    <span id="test" data-bind="text:outterAttr"></span>\
  </div>',
  renderedChild: ko.observableArray([]),
  arrays: ko.observableArray([1,'a', 4,2,3]),
  reversearrays: ko.observableArray(),
  sortarrays: ko.observableArray(),
  classes: ko.observable('class1 class2 class3'),
  runonce: ko.observable(false)
}
viewmodel.computedObj = ko.computed(function () {
  return viewmodel.reversearrays()
})
viewmodel.renderedChild.subscribe(function(oldValue) {
  console.log('spectate')
}, null, "spectate");
viewmodel.renderedChild.subscribe(function(oldValue) {
  console.log('subscribe')
});
ko.when(function(){
  console.log('我只运行一次')
}, viewmodel.runonce)
viewmodel.runonce(true)
viewmodel.runonce(false)
viewmodel.runonce(true)
console.log(viewmodel.computedObj.getDependencies())
ko.components.register('childmodal', {
    viewModel: function () {
      this.test = ko.observable('childmodal')
      this.koDescendantsComplete = function (element) {
        viewmodel.renderedChild.push('childmodal')
      }
    },
    template: "<div data-bind='text: test'></div><grandchildmodal></grandchildmodal>"
});
ko.components.register('grandchildmodal', {
  viewModel: function () {
    this.test = ko.observable('grandchildmodal')
    this.koDescendantsComplete = function (element) {
      viewmodel.renderedChild.push('grandchildmodal')
    }
  },
  template: "<div data-bind='text: outterArr2'></div>"
});
ko.components.register('parentmodal', {
  viewModel: function () {
    this.test = ko.observable('parentmodal')
    this.koDescendantsComplete = function (element) {
      viewmodel.renderedChild.push('parentmodal')
    }
  },
  template: "<div data-bind='text: test'></div><childmodal></childmodal>"
});
// ko.options.createChildContextWithAs = true
var el = document.getElementById('test')
console.log("before:" + el.innerHTML)
ko.applyBindings(viewmodel)
viewmodel.reversearrays(viewmodel.arrays.reversed())
viewmodel.sortarrays(viewmodel.arrays.sorted())
