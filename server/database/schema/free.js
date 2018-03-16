const mongoose = require("mongoose");
const { Schema } = mongoose;
const FreeSchema = new Schema({
  _id: Number,
  freeId: Array,
  name: String,
  author: String,
  href: String,
  chapter:Array,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

FreeSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

FreeSchema.statics = {
  async SaveFree(free) {
    let getFree = await this.findOne({ _id: free._id }).exec();
    const _free = free;
    if (getFree) {
      getFree.name = free.name;
      getFree.author = free.author;
      getFree.freeId = free.freeId;
      getFree.href = free.href;
      getFree.chapter = free.chapter;
    } else {
      getFree = new Free(_free);
    }
    try {
      const res = await getFree.save();
      console.log(`${free.name}更新成功`);
      return res;
    } catch (error) {
      console.log(`${free.name}更新失败`);
      console.log(error);
    }
  }
};

const Free = mongoose.model("t_book_free", FreeSchema);
module.exports = Free;

