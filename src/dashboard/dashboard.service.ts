import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';  
import { Expense } from 'src/expenses/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DashboardService {

    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,

        @InjectRepository(Income)
        private readonly incomeRepository: Repository<Income>
    ) {}

    async getDashboardData(id: string) {
        const expenses = await this.expenseRepository.find({
            where: {
                user: {
                    id
                }
            }
        });
        const incomes = await this.incomeRepository.find({
            where: {
                user: {
                    id
                }
            }
        });

        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);

        const labelsExpenses = expenses.map(expense => dayjs(expense.spendAt).format('MM-DD-YYYY'));
        const labelsIncomes = incomes.map(income => dayjs(income.spendAt).format('MM-DD-YYYY'));
        const amountExpenses = expenses.map(expense => expense.amount);
        const amountIncomes = incomes.map(income => income.amount);

        const ExpensesGraph = {
            labels: labelsExpenses,
            amounts: amountExpenses
        }

        const IncomesGraph = {
            labels: labelsIncomes,
            amounts: amountIncomes
        }

        return {
            totalExpenses,
            totalIncomes,
            totalBalance: totalIncomes - totalExpenses,
            ExpensesGraph,
            IncomesGraph,
            expenses,
            incomes,
        }
    }
}
