import mongoose, { Schema, models } from "mongoose";

const BookSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["want", "reading", "completed"],
      default: "want",
    },
  },
  {
    timestamps: true,
  },
);

export default models.Book || mongoose.model("Book", BookSchema);
