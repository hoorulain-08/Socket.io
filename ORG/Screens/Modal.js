
function SignUp() {
    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    return (
      <View>
        <Button title="Open Modal" onPress={toggleModal} />
        <Text style={styles.modal}>This is a modal</Text>
  {/* 
         <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.modal}>This is a modal</Text>
            <Button title="Close Modal" onPress={toggleModal} />
          </View>
        </Modal>  */}
      </View>
    );
  };
  
  export default SignUp;
  
  
  
  
  
  