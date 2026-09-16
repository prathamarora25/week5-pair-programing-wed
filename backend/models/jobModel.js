const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },

  type: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
  },

  location: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    required: true,
  },

  postedDate: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field for company name
jobSchema.virtual("companyName").get(function () {
  return this.company.name;
});

// Include virtual fields when converting documents to JSON
jobSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;