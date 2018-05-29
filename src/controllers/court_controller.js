// Court controller
import Court from '../models/court_model';

export const createCourt = (req, res) => {
  const court = new Court();
  court.title = req.body.title;
  // court.lat = req.body.lat;
  // court.long = req.body.long;
  court.coordinate.lat = req.body.lat;
  court.coordinate.long = req.body.long;
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
  Court.find().populate('game_list')
    .then((result) => {
      res.send(result);
    }).catch((error) => {
      res.status(500).json({ error });
    });
};

export const getCourt = (req, res) => {
  // console.log(req.params.id);
  Court.findById(req.params.id).populate('game_list')
    .then((result) => {
      console.log('success');
      console.log(result.body.lat);
      console.log(result.body.long);
      console.log(result.body.game_list);
      res.send(result);
    }).catch((error) => {
      // console.log('error');
      // console.log(error);
      res.status(500).json({ error });
    });
};

// Add game to court
export const addGameToCourt = (req, res) => {
  // console.log('req.params', req.body);
  const query = { _id: req.params.id };
  // const update = req.body;

  // if user is in players_list, ignore
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Browser_compatibility
  if (req.body.game_list.includes(req.game)) {
    return res.status(500).send('Game is already in this court');
  } else {
    req.body.game_list.push(req.game); // add player to player_list
    const update = req.body;
    // if user not in players_list, add player to the list
    Court.findOneAndUpdate(query, update)
      .then((result) => {
        // console.log('success');
        // console.log(result);
        res.send(result);
      }).catch((error) => {
        // console.log('error');
        // console.log(error);
        res.status(500).json({ error });
      });
  }
};
//
// export const removeGamefromCourt = (req, res) => {
//   // console.log('req.params', req.body);
//   const query = { _id: req.params.id };
//   // const update = req.body;
//
//   // if user is in players_list, ignore
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Browser_compatibility
//   if (req.body.game_list.includes(req.game)) {
//     req.body.game_list.push(req.game); // add player to player_list
//     const update = req.body;
//     // if user not in players_list, add player to the list
//     Court.findOneAndUpdate(query, update)
//       .then((result) => {
//         // console.log('success');
//         // console.log(result);
//         res.send(result);
//       }).catch((error) => {
//         // console.log('error');
//         // console.log(error);
//         res.status(500).json({ error });
//       });
//   } else {
//     return res.status(500).send('This game does not exist this court');
//   }
// };
