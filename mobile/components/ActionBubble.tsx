import { Text, TouchableOpacity } from "react-native";

const ActionBubble = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="self-end max-w-[80%] bg-[#E8DC2A] p-3 rounded-2xl mt-2 active:opacity-80"
    >
      <Text className="text-black font-semibold text-right">Dołączam</Text>
    </TouchableOpacity>
  );
};

export default ActionBubble;
