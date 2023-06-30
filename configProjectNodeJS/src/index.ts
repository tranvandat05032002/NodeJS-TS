const sum = (a: number, b: number) => {
  return a + b
}
type Handle = () => Promise<string>
const fullName = 'Tran Van Dat'
const handleFullName: Handle = () => {
  return Promise.resolve(fullName)
}
handleFullName().then(console.log)

const address: string = 'Tu Xuong'

console.log(address)
