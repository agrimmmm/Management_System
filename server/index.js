const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
const e = require("express");
const employeemodel = require("./employee");
const multer = require("multer");
const nodemailer = require("nodemailer");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/files", express.static("files"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// require("./pdfDetails");
const PdfDetailsSchema = new mongoose.Schema(
  {
    cpdf: String,
    ctitle: String,
    qpdf: String,
    qtitle: String,
  },
  { collection: "PdfDetails" }
);
// const PdfSchema = mongoose.model("PdfDetails");
// require("./pdfDetails");

const PdfSchema = mongoose.model("PdfDetails", PdfDetailsSchema);
const upload = multer({ storage: storage });

// const upload = multer({ dest: "./files" });
app.post(
  "/upload-files",
  upload.fields([
    { name: "chimsFile2", maxCount: 1 },
    { name: "quoteFile", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.files);
    const chimsFile2 = req.files["chimsFile2"][0];
    const quoteFile = req.files["quoteFile"][0];

    const chimsTitle = chimsFile2.originalname;
    const chimsPdf = chimsFile2.filename;

    const quoteTitle = quoteFile.originalname;
    const quotePdf = quoteFile.filename;

    try {
      const pdfDetails = new PdfSchema({
        cpdf: chimsPdf,
        ctitle: chimsTitle,
        qpdf: quotePdf,
        qtitle: quoteTitle,
      });
      await pdfDetails.save();
      res.status(201).send({ pdfDetailsId: pdfDetails._id, pdfDetails });
    } catch (error) {
      res.status(400).send;
    }
  }
);
app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

// const app

mongoose.connect(
  "mongodb+srv://gargaditya2405:05dx9FW99PHBg2za@arkadatabase.6xgb4kx.mongodb.net/?retryWrites=true&w=majority&appName=ArkaDatabase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  employeemodel
    .findOne({ $or: [{ username: email }, { email: email }] })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.status(201).json(user);
        } else {
          res.status(210).json("the password is incorrect");
        }
      } else {
        res.status(210).json("User not found");
      }
    })
    .catch((error) => {
      console.error("Error in login:", error);
      res.status(500).json("An error occurred while logging in");
    });
});

const ticketSchema = new mongoose.Schema({
  user: String,
  date: String,
  team: String,
  project: String,
  slotDate: String,
  slotTime: String,
});

const purchaseSchema = new mongoose.Schema({
  user: String,
  date: String,
  linkToPurchase: String,
  componentName: String,
  quantity: Number,
  chimsFile: String,
  quoteFile: String,
  project: String,
  team: String,
  pdfDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PdfDetails", // Referring to PdfDetailsSchema model
  },
  // chimsFiledata: String,
  // quoteFiledata: String,
  approval: { type: String, default: "Pending" },
  arrival: { type: String, default: "No" },
  orderNo: { type: String, default: "" },
  billNo: { type: String, default: "" },
  trackingNo: { type: String, default: "" },
  description: { type: String, default: "" },
  grossamount: { type: String, default: "" },
  netamount: { type: String, default: "" },
  paidby: { type: String, default: "" },
  recipient: { type: String, default: "" },
  datepayment: { type: String, default: "" },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
const Ticket = mongoose.model("Ticket", ticketSchema);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// Handle form submission
app.post("/ticket", async (req, res) => {
  try {
    const { ...ticketData } = req.body;

    const ticket = new Ticket ({
      ...ticketData,
    });
    await ticket.save();

    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/purchase", async (req, res) => {
  try {
    const { pdfDetailsId, remarks, ...purchaseData } = req.body;

    // Create a new Purchase document with the pdfDetails reference
    const purchase = new Purchase({
      ...purchaseData,
      pdfDetails: pdfDetailsId, // Pass the pdfDetailsId directly
      remarks,
    });
    await purchase.save();

    res.status(201).send(purchase);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/ticket", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/purchase", async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("pdfDetails");
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", (req, res) => {
  employeemodel
    .create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.put("/purchase/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderNo,
      approval,
      arrival,
      billNo,
      trackingNo,
      description,
      grossamount,
      netamount,
      paidby,
      recipient,
      datepayment,
    } = req.body;

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      id,
      {
        orderNo,
        approval,
        arrival,
        billNo,
        trackingNo,
        description,
        grossamount,
        netamount,
        paidby,
        recipient,
        datepayment,
      },
      { new: true }
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    res.json(updatedPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/sendmail", async (req, res) => {
  try {
    const { componentName, user, email } = req.body;
    // console.log(componentName, user, email);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'dasstest324@gmail.com',
          pass: 'paxfdszdwqemdyjd'
      }
    });

    async function main() {
      const info = await transporter.sendMail({
        from: '"Test Dass" <dasstest324@gmail.com>',
        to: "agrimmittal2004@gmail.com",
        subject: "Order Arrived!",
        html: `<p>Dear ${user},</p><br><p>Your order for ${componentName} has arrived! Collect it from the Order Collection Desk.</p><br><b>Arka Aerospace 2024</b>`,
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    }

    main().catch(error => {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/leave-mail", async (req, res) => {
  try {
    const { user } = req.body;
    // console.log(componentName, user, email);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'dasstest324@gmail.com',
          pass: 'paxfdszdwqemdyjd'
      }
    });

    async function main() {
      const info = await transporter.sendMail({
        from: '"Test Dass" <dasstest324@gmail.com>',
        to: "agrimmittal2004@gmail.com",
        subject: "Leave Approved!",
        html: `<p>Dear ${user},</p><br><p>Your leave has been approved.<br><br> See you soon :)</p><br><b>Arka Aerospace 2024</b>`,
      });

      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Email sent successfully" });
    }

    main().catch(error => {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const leaveApplicationSchema = new mongoose.Schema({
  userName: String,
  startDate: String,
  endDate: String,
  leaveType: String,
  reason: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const LeaveApplication = mongoose.model('LeaveApplication', leaveApplicationSchema);

app.post('/leave-application', async (req, res) => {
  try {
    const { startDate, endDate, leaveType, reason, userName } = req.body;
    // Assuming you're sending the user's name in the request body

    const newLeaveApplication = new LeaveApplication({
      userName,
      startDate,
      endDate,
      leaveType,
      reason,
    });

    const savedLeaveApplication = await newLeaveApplication.save();
    res.status(201).json(savedLeaveApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/leave-applications', async (req, res) => {
  try {
    const leaveApplications = await LeaveApplication.find();
    res.json(leaveApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/leave-applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLeaveApplication = await LeaveApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeaveApplication) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    res.json(updatedLeaveApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search

app.get("/amazon-search", async (req, res) => {
  const searchTerm = req.query.k;
  try {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching Amazon search results:", error);
    res.status(500).send("Error fetching Amazon search results");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});