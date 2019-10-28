import {lawnTractor} from './mock/mockD110'

export const fetchEquipment = () => {
  return fetch(lawnTractor)
    .then(res => JSON.stringify(res))
    .then(data => console.log(data))
}