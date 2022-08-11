import React from "react"
const ColorContext = React.createContext()

export const ColorProvider = ColorContext.Provider
export const ColorConsumer = ColorContext.Consumer

export default ColorContext