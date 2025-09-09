export interface BatteryStatus {
  present: boolean
  technology: string
  health: string
  plugged: string
  status: string
  temperature: number
  voltage: number
  current: number
  current_average: number
  percentage: number
  level: number
  scale: number
  charge_counter: number
  energy: any
  cycle: number
}
