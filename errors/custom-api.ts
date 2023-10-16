class CustomAPIErrorClass extends Error {
  constructor(message: string) {
    super(message)
  }
}
  
module.exports = CustomAPIErrorClass