// Court controller
import Court from '../models/court_model';

export const createCourt = (req, res) => {
  const court = new Court();
  court.title = req.body.title;
  court.lat = req.body.lat;
  court.long = req.body.long;
  court.game_list = req.body.game_list;
  court.save()
    .then((result) => {
      res.json({ message: 'Court created!' });
      // console.log(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getCourts = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

export const getCourt = (req, res) => {
  // console.log(req.params.id);
  Court.findById(req.params.id)
    .then((result) => {
      console.log('success');
      console.log(result.body.lat);
      console.log(result.body.long);
      res.send(result);
    }).catch((error) => {
      // console.log('error');
      // console.log(error);
      res.status(500).json({ error });
    });
};
