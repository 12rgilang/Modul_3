const express = require('express')
const Router = express.Router()

// Import All Controller
const {expenseController} = require('./../controllers') // Akan otomatis mengambil file index.js nya
Router.get('/get', expenseController.getExpense)
Router.get('/detail/:id', expenseController.getExpenseDetail)
Router.get('/total', expenseController.totalExpenseByRange)

module.exports = Router