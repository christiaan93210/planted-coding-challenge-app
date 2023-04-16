import customerLocations from '.././data/customerLocations.json';
import plantationProjects from '.././data/plantationProjects.json';

const geolib = require('geolib');

const findProjects = (name: string) => {
  for (let i = 0; i < customerLocations.length; i++) {
    if (customerLocations[i].name === name) {
      let result: {latitude?: number; longitude?: number} = {};
      result.latitude = customerLocations[i].latitude;
      result.longitude = customerLocations[i].longitude;
      let newProjects = plantationProjects.map(project => ({
        projectName: project.projectName,
        distance:
          geolib.getDistance(result, {
            latitude: parseFloat(project.latitude),
            longitude: parseFloat(project.longitude),
          }) / 1000,
      }));
      newProjects.sort((a, b) => a.distance - b.distance);
      return newProjects.splice(0, 3);
    }
  }
  return [];
};

export default findProjects;
