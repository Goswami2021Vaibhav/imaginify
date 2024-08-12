import { Document, Schema, Types, model, models } from "mongoose";

export interface TransactionInterface extends Document {
    createdAt: Date;
    stripeId: string;
    amount: number;
    plan: string;
    credits: number;
    buyer: Types.ObjectId;
}

const TransactionSchema = new Schema<TransactionInterface>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    plan: {
        type: String,
    },
    credits: {
        type: Number,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const Transaction = models?.Transaction || model<TransactionInterface>("Transaction", TransactionSchema);

export default Transaction;