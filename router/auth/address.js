const express = require("express");
const route = express.Router();
const { Shipping_address } = require("../../model/Shipping_address");
const { Userinfo } = require("../../model/Userinfo");

//endpoind "/address/all"
route.get("/all", async (req, res) => {
  const address = await Shipping_address.findAll({
    where: { email: req.user._uid },
  });
  res.status(200).json(address);
});

route.post("/add", async (req, res) => {
  try {
    if (req.body && req.user) {
      const all = await Shipping_address.findAll();
      const user = await Userinfo.findOne({ email: req.user._uid });
      if (user) {
        const address = await Shipping_address.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          street: req.body.street,
          county: req.body.county,
          tambon: req.body.tambon,
          states: req.body.amphure,
          zipCode: req.body.zipCode,
          email: req.user._uid,
          phone: req.body.phone,
          status: all.length === 0 ? 1 : 0,
        });
        return res.status(200).json(address);
      } else {
        return res.status(401).send(" error incorrect user not account");
      }
    } else {
      return res.status(500).send(" !error none data info ");
    }
  } catch (error) {
    res.send(error);
  }
});

route.post("/updateaddress", async (req, res) => {
  try {
    if (req.body && req.user) {
      const all = await Shipping_address.findAll();
      const user = await Userinfo.findOne({ email: req.user._uid });
      if (user) {
        const address = await Shipping_address.update({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          company: req.body.company,
          street: req.body.street,
          county: req.body.county,
          tambon: req.body.tambon,
          amphure: req.body.amphure,
          zipCode: req.body.zipCode,
          email: req.body.email,
          phone: req.body.phone,
        });
        return res.status(200).json(address);
      } else {
        return res.status(401).send(" error incorrect user not account");
      }
    } else {
      return res.status(500).send(" !error none data info ");
    }
  } catch (error) {
    res.send(error);
  }
});

route.post("/setdefultaddress", async (req, res) => {
  const id = await Shipping_address.findByPk(req.body.id);
  if (id) {
    try {
      await Shipping_address.update(
        {
          status: 0,
        },
        {
          where: {
            status: 1,
          },
        }
      ).then(async (data) => {
        if (data) {
          await Shipping_address.update(
            {
              status: req.body.status,
            },
            {
              where: {
                id: req.body.id,
              },
            }
          ).then((data2) => {
            if (data2) {
              res.status(200).json(" successfully set deflut address ");
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

route.post("/deleted", async (req, res) => {
  const id = await Shipping_address.findByPk(req.body.id);
  if (id) {
    try {
      await Shipping_address.destroy({ where: { id: req.body.id } })
      .then(() => {
          res.status(200).send('successfully');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = route;
