const mock = {
    showImagePicker: (options, callback) => {
        callback({
            didCancel: false,
            error: null,
            customButton: null,
            uri: 'test',
            width: 1,
            height: 1,
            data: 'test'
        });
    }
};

jest.mock('react-native-image-picker', () => ({
    mock
}));

export default mock;

module.exports = mock;