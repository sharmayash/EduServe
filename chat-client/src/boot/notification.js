import { Notify } from "quasar"
import { Platform } from "quasar"

let position

Platform.is.mobile ? (position = "top") : (position = "right")

Notify.setDefaults({
  position,
  progress: true,
	timeout: 2500,
	textColor: "white"
})
