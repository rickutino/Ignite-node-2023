import { Readable } from 'stream';

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if(i > 5) {
        this.push(null)
      } else {
        const str = `${i}`.padStart(3, '0')
        const buf = Buffer.from(str)
        this.push(buf)
      }
    }, 1000)
  }
}

fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then((response) => {
  return response.text()
}).then(data => {
  console.log(data)
})