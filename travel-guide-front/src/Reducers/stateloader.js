class StateLoader {

    loadState() {
        try {
            let serializedState = localStorage.getItem("travelexperiences:state");

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem("travelexperiences:state", serializedState);
        }
        catch (err) {
        }
    }

    initializeState() {
        return {
            //state object
        }
    };
}
export default StateLoader