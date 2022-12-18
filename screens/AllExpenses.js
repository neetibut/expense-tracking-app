import { View, Text } from "react-native"
import React, { useContext } from "react"
import ExpensesOutput from "../components/Expenses/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext)
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found."
    />
  )
}
