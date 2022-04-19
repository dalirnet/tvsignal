import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

const isProduction = process.env.NODE_ENV === "production"

const rollupPlugins = [typescript({ tsconfig: "./tsconfig.json" })]
if (isProduction) {
    rollupPlugins.push(terser())
}

export default [
    {
        input: "src/index.ts",
        external: ["lodash", "axios", "muninn"],
        plugins: rollupPlugins,
        output: [
            {
                file: "dist/index.mjs",
                format: "es",
                compact: isProduction,
            },
            {
                file: "dist/index.cjs",
                format: "cjs",
                compact: isProduction,
            },
        ],
    },
    {
        input: "src/cli.ts",
        external: ["lodash", "yargs"],
        plugins: rollupPlugins,
        output: [
            {
                file: "dist/cli.cjs",
                format: "cjs",
                compact: isProduction,
            },
        ],
    },
]
