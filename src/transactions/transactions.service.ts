import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from 'src/debts/entities/debt.entity';
import { Expense } from 'src/expenses/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';  
import { Category } from 'src/categories/entities/category.entity';


@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,

        @InjectRepository(Income)
        private readonly incomeRepository: Repository<Income>,

        @InjectRepository(Debt)
        private readonly dev: Repository<Debt>

    ) {}


    async getTransactionsData(userId: string) {
        // Obtén los datos de cada tabla, seleccionando solo las columnas necesarias
        const expenses = await this.expenseRepository.find({
            where: { user: { id: userId } },
            select: ['expenseId', 'amount', 'creation_date', 'concept'],
            order: { creation_date: 'DESC' },
            relations: ['category'],
        });
    
        const incomes = await this.incomeRepository.find({
            where: { user: { id: userId } },
            select: ['incomeId', 'amount', 'creation_date', 'concept'],
            order: { creation_date: 'DESC' },
            relations: ['category'],
        })
    
        const debts = await this.dev.find({
            where: { user: { id: userId } },
            select: ['debtId', 'amount', 'creation_date', 'concept'],
            order: { creation_date: 'DESC' },
            relations:['category']
        });
    
        // Combinar y ordenar los últimos movimientos
        const recentMovements = [
            ...expenses.map(expense => ({
                id: expense.expenseId,
                type: 'expense',
                amount: expense.amount,
                creation_date: dayjs(expense.creation_date).format('MM-DD-YYYY'),
                concept: expense.concept,
                category: expense.category
            })),
            ...incomes.map(income => ({
                id: income.incomeId,
                type: 'income',
                amount: income.amount,
                creation_date: dayjs(income.creation_date).format('MM-DD-YYYY'),
                concept: income.concept,
                category: income.category
            })),
            ...debts.map(debt => ({
                id: debt.debtId,
                type: 'debt',
                amount: debt.amount,
                creation_date: dayjs(debt.creation_date).format('MM-DD-YYYY'),
                concept: debt.concept,
                category: debt.category
            })),
        ]
            .sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime())
        const all = [...expenses, ...incomes, ...debts].sort((b, a) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
        // Calcula los totales
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
        const totalDebts = debts.reduce((acc, debt) => acc + debt.amount, 0);
        
        // Prepara los datos para las gráficas
        const labelsExpenses = expenses.map(expense => 
            expense.creation_date ? dayjs(expense.creation_date).format('MM-DD-YYYY') : 'N/A'
        );
        const amountExpenses = expenses.map(expense => expense.amount);
    
        const labelsIncomes = incomes.map(income => 
            income.creation_date ? dayjs(income.creation_date).format('MM-DD-YYYY') : 'N/A'
        );
        const amountIncomes = incomes.map(income => income.amount);

        const labelsTotalBalance = all.map(movement =>
            movement.creation_date ? dayjs(movement.creation_date).format('MM-DD-YYYY') : 'N/A'
        );

        const amountTotalBalance = all.map(movement => {
            if (movement.hasOwnProperty('expenseId')) return -movement.amount
            return movement.amount
        }
        );
    
        const ExpensesGraph = {
            labels: labelsExpenses,
            amounts: amountExpenses,
        };
    
        const IncomesGraph = {
            labels: labelsIncomes,
            amounts: amountIncomes,
        };

        const TotalBalanceGraph = {
            labels: labelsTotalBalance,
            amounts: amountTotalBalance,
        };
    
        // Devuelve el resultado final
        return {
            Transactions: recentMovements
        };
    }
}
