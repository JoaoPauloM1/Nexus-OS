
// Audio system
const audioSystem = {

    enabled: true,

    sounds: {},

    // Load audio files
    load: function() {

        this.sounds.boot = new Audio("assets/sounds/boot.mp3");

    },

    // Play a sound
    play: function(soundName) {

        if (!this.enabled) return;

        const sound = this.sounds[soundName];

        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(error => {
                console.log("Audio playback was blocked:", error);
            });
        }

    }

};

// Load audio files
audioSystem.load();