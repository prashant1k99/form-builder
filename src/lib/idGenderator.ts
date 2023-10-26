export default function idGenerator(type: string):string {
  return type + '-' + Math.floor(Math.random() * 10001).toString()
}