import ProcesoService from "../services/ProcesoService";

import moment from 'moment'

class ProcesoController {

  static lista(req, res) {           
    Promise.all([ProcesoService.getAll(req.params.id)])
      .then(([data]) => {
        res.status(200).send({ result: data });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }

}

export default ProcesoController;
