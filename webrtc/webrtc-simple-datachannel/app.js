const { createApp } = Vue;

createApp({
    data() {
        return {
            message: "",
            messageList: [],
            connected: false
        }
    },
    methods: {
        connectHandle() {
            this.localConnection = new RTCPeerConnection()
            this.sendChannel = this.localConnection.createDataChannel('sendChannel')
            this.sendChannel.onopen = this.handleSendChannelStatusChange
            this.sendChannel.onclose = this.handleSendChannelStatusChange

            this.remoteConnection = new RTCPeerConnection()
            this.remoteConnection.ondatachannel = this.reciveDataChannelHandle

            this.localConnection.onicecandidate = e => !e.candidate || this.remoteConnection.addIceCandidate(e.candidate).catch(this.handleAddCandidateError)
            this.remoteConnection.onicecandidate = e => !e.candidate || this.localConnection.addIceCandidate(e.candidate).catch(this.handleAddCandidateError)

            this.localConnection.createOffer()
                .then((offer) => {
                    return this.localConnection.setLocalDescription(offer)
                })
                .then(() => {
                    return this.remoteConnection.setRemoteDescription(this.localConnection.localDescription)
                })
                .then(() => {
                    return this.remoteConnection.createAnswer()
                })
                .then(answer => {
                    return this.remoteConnection.setLocalDescription(answer)
                })
                .then(() => {
                    this.localConnection.setRemoteDescription(this.remoteConnection.localDescription)
                    // this.connected = true;
                })
                .catch(this.handleCreateDescriptionError)
        },
        disconnectHandle() {
            this.sendChannel.close()
            this.reciveChannel.close()
            this.localConnection.close()
            this.remoteConnection.close()
            this.sendChannel = null;
            this.reciveChannel = null;
            this.localConnection = null;
            this.remoteConnection = null;
            this.message = ""
            this.messageList = []
            this.connected = false;
        },
        sendMessage() {
            this.sendChannel.send(this.message)
            this.message = ''
        },
        handleSendChannelStatusChange(e) {
            if (this.sendChannel) {
                const state = this.sendChannel.readyState;
                if (state === 'open') {
                    this.connected = true;
                } else {
                    this.connected = false;
                }
            }
        },
        reciveDataChannelHandle(e) {
            const reciveChannel = this.reciveChannel = e.channel;
            reciveChannel.onmessage = this.handleReciveMessage
            reciveChannel.onopen = this.handleReciveChannelStateChange
            reciveChannel.onclose = this.handleReciveChannelStateChange
        },
        handleReciveMessage(e) {
            console.log(e)
            this.messageList.push(e.data)
        },
        handleCreateDescriptionError(err) {
            console.error(err)
            // this.connected = false;
        },
        handleReciveChannelStateChange() {

        },
        handleAddCandidateError() {

        }
    }
}).mount("#app")