import yargs from "yargs"

const argv = yargs(process.argv.slice(2))

try {
    console.log(argv)
} catch ({ message }) {
    console.error(message)
}
