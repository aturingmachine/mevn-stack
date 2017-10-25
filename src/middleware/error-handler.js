//Remove the try-catch blocks using this pupper
//This is mostly here to give an example

exports.catchErrors = (action) => {
  return (req, res, next) => {
    action(req, res).catch(next)
  }
}