
export default function contract(shema, body) {
  for (const key of Object.keys(body)) {
    const rule = shema.properties[key];

    if (rule === undefined) {
      delete body[key];
      continue;
    }

    let value = body[key];

    if (typeof body[key] === 'string') {
      value = body[key].trim();
    }

    if (typeof rule.type === 'string') {
      if (rule.type === 'string') {
        body[key] = value + '';
      }
      else if (rule.type === 'number') {
        body[key] = +value;
      }
      else if (rule.type === 'null') {
        body[key] = null;
      }

      continue;
    }

    for (const type of rule.type) {
      if (value === '') {
        body[key] = rule.default;
        break;
      }

      if (rule.type === 'string') {
        body[key] = value + '';
      }
      else if (type === 'number') {
        body[key] = +value;
      }
      else if (rule.type === 'null') {
        body[key] = null;
      }
    }
  }

  return body;
}
