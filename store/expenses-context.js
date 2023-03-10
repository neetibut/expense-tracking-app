import React, { createContext, useReducer } from "react"

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2022-12-19"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 49.99,
//     date: new Date("2022-02-01"),
//   },
//   {
//     id: "e3",
//     description: "Some garlic",
//     amount: 5.99,
//     date: new Date("2022-07-12"),
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 15.99,
//     date: new Date("2022-03-08"),
//   },
//   {
//     id: "e5",
//     description: "Dog treats",
//     amount: 5.99,
//     date: new Date("2022-07-28"),
//   },
// ]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString()
      return [action.payload, ...state]
    case "SET":
      const inverted = action.payload.reverse()
      return inverted
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData })
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses })
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
