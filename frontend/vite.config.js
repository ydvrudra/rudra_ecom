import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //port: 5151,  Fixed port set karein yahan
    //strictPort: true,  Port change nahi hoga agar yeh busy ho
  }, 
})
