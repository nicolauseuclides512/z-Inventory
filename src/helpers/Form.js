import Axios from 'axios'

class Errors {
  constructor () {
    this.errors = {}
  }

  has (key) {
    return this.errors.hasOwnProperty(key)
  }

  get (key) {
    return this.errors[key]
  }

  record (errors) {
    return this.errors = errors
  }

  clear () {
    this.errors = {}
  }
}

export default class {

  constructor (data) {
    this.originalData = data

    for (let key in data) {
      this[key] = data[key]
    }

    this.errors = new Errors()
  }

  data () {
    let data = {};

    for (let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }

  async submit (method, url) {
    const methodType = method.toLowerCase()

    if (methodType === 'post' || methodType === 'put' || methodType === 'patch') {
      return await Axios[method.toLowerCase()](url, this.data())
    }

    return await Axios[method.toLowerCase()](url, {params: this.data()})
  }

  async post (url) {
    return await this.submit('POST', url)
  }

  async put (url) {
    return await this.submit('PUT', url)
  }

  async patch (url) {
    return await this.submit('PATCH', url)
  }

  async delete (url) {
    return await this.submit('DELETE', url)
  }

  reset () {
    for (let key in this.originalData) {
      this[key] = this.originalData[key]
    }
  }
}
