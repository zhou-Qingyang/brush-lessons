import path from 'path';
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import react from '@vitejs/plugin-react'

export default ({
  command,
  mode
}) => {
  const NODE_ENV = mode || 'development'
  const envFiles = [
    `.env.${NODE_ENV}`
  ]
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
  const optimizeDeps = {}
  const alias = {
    '@': path.resolve(__dirname, './src'),
  }
  const esbuild = {}
  const rollupOptions = {
    output: {
      entryFileNames: 'assets/087AC4D233B64EB0[name].[hash].js',
      chunkFileNames: 'assets/087AC4D233B64EB0[name].[hash].js',
      assetFileNames: 'assets/087AC4D233B64EB0[name].[hash].[ext]',
    },
  }
  const config = {
    base: './', // index.html文件所在位置
    root: './',
    resolve: {
      alias,
    },
    define: {
      'process.env': {}
    },
    server: {
      open: true,
      port: process.env.VITE_CLI_PORT,
      proxy: {
        [process.env.VITE_BASE_API]: {
          target: `${process.env.VITE_BASE_URL}:${process.env.VITE_SERVER_PORT}`, // 代理到 目标路径
          changeOrigin: false,
          rewrite: path => path.replace(new RegExp('^' + process.env.VITE_BASE_API), ''),
        }
      },
    },
    build: {
      minify: 'terser',
      manifest: false,
      sourcemap: false,
      outDir: 'dist',
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      react()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/style/element/index.scss" as *;`,
        }
      }
    },
  }

  return config
}