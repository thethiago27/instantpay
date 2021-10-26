import Mongo from '../database/mongo';

const connection = new Mongo();

// Get User Balance

async function getBalance(userId: string) {
    const result = await (await connection.collection('balance')).findOne({ userId });
    return result ? result.balance : 0;
}

// Add User Balance

async function addBalance(userId: string, amount: number) {
    const balance = await getBalance(userId);
    await (await connection.collection('balance')).updateOne({ userId }, { $set: { balance: balance + amount } });
    await registerTransaction(userId, amount, 'Transfer recived');
}

// Withdraw User Balance

async function withdrawBalance(userId: string, amount: number) {
    const balance = await getBalance(userId);
    if (balance < amount) {
        throw new Error('Not enough balance');
    }
    await (await connection.collection('balance')).updateOne({ userId }, { $set: { balance: balance - amount } });
}

// Transfer User Balance

export async function transferBalance(from: string, to: string, amount: number) {
    await withdrawBalance(from, amount);
    await addBalance(to, amount);

    await registerTransaction(from, -amount, `Transfer to ${to}`);
}

async function registerTransaction(userId: string, amount: number, description: string) {
    await (await connection.collection('balance'))
        .updateOne({ userId }, { $push: { history: {
            amount, 
            date: new Date(), 
            description,
            type: "Transfer"
        }} 
    });
}

