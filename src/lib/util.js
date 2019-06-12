const handleErrors = function (errors, fields, errorTitle, self) {
  let msg = errorTitle + '</br><ul>'
  for (let error in errors) {
    // console.log(errors[error].field)
    msg += '<li>' + errors[error].message + '</li>'
  }
  msg += '</ul>'

  self.$message({
    showClose: true,
    message: msg,
    type: 'error',
    dangerouslyUseHTMLString: true
  })
}

export {
  handleErrors
}
