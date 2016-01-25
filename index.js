module.exports = pipe

function pipe () {
  var args = [].slice.apply(arguments)
  if (!arguments.length) throw new Error('pipe requires one or more arguments')
  return reduce(kestrel, args[0], rest(args))
}

function rest (ar) {
  return ar.slice(1)
}

function reduce (fn, acc, list) {
  return list.reduce(fn, acc)
}

function kestrel (a, b) {
  return function () {
    var self = this
    return a.apply(self, arguments)
      .then(function (result) {
        return b.call(self, result)
      })
  }
}
