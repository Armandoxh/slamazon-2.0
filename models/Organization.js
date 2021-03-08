const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const OrganizationSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    budget: Number,

    companyUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  { timestamps: true }
);

const Organization = mongoose.model("User", OrganizationSchema);
module.exports = Organization;
