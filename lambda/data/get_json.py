import json

# https://developer.amazon.com/en-US/docs/alexa/custom-skills/create-and-edit-custom-slot-types.html

slotDicts = []

# names, facts
with open("president_info.json", "r") as f:
  data = json.load(f)
  for i in range(len(data)):
    pres = data[i]
    mainName = pres["names"][0]
    secondaryNames = pres["names"][1:]
    slotDicts.append({
      "id": i,
      "name": {
        "value": mainName,
        "synonyms": secondaryNames
      }
    })

with open("./president_slots.json", "w") as outfile:
  json.dump(slotDicts, outfile)