import './config/module-alias'

import 'reflect-metadata'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

app.listen(env.serverPort, () => console.log('[SERVER UP AND RUNNING]'))
