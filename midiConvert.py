import mido
import time

mid = mido.MidiFile("midi/moonlight.mid")
port = mido.open_output()
a=mid.play()
notes = {0:"C",1:"C#",2:"D",3:"D#",4:"E",5:"F",6:"F#",7:"G",8:"G#",9:"A",10:"A#",11:"B"}
current_time = 0


def messageParser(msgs):
    te = []
    for msg in msgs:
        if msg.type == "note_on":
            te.append(msg.note)
            print(notes[msg.note % 12])
    print("____")
    if len(te)>1:
        return [max(te)%6,min(te)%6]
    elif len(te)==1:
        return [te[0]%6]

messages=[]
spears = []
for message in mid:
    #port.send(message)
    try:
        if not message.is_meta:
            messages.append(message)
            if message.time !=0:
                alpha = messageParser(messages[:-1])
                if alpha is not None:
                    spears.append([current_time, alpha])
                current_time += message.time
                messages = [messages[-1]]


    except AttributeError as e:
        pass
print(spears)
# possible
# 1,2,3,4,5,6
#1,2 ; 2,3 ; 3,4 ; 4,5 ; 5,6 ; 6,1
#1,4 2,5 3,6


