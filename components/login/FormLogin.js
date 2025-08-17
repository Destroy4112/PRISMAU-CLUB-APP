import React, { useRef } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import tw from "tailwind-react-native-classnames";

export default function FormLogin({
  loading, documento, password, setDocumento, setPassword, handleLogin, show, toggleShowPassword, go,
}) {
  const passwordRef = useRef(null);
  const phColor = "#6B7280";

  return (
    <View style={[tw`mt-5`, { width: "85%" }]}>
      <View style={tw`flex flex-row items-center w-full h-12 rounded-full border-2 border-gray-200 bg-gray-100 mb-2`}>
        <FontAwesome name="user-alt" style={tw`mr-0.5 px-4 text-lg text-gray-500`} />
        <TextInput
          placeholder="Número de documento"
          placeholderTextColor={phColor}
          style={tw`flex-1 text-sm text-gray-500`}
          value={documento}
          onChangeText={setDocumento}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
        />
      </View>

      <View style={tw`flex flex-row items-center w-full h-12 rounded-full border-2 border-gray-200 bg-gray-100 mt-2`}>
        <FontAwesome name="lock" style={tw`mr-1 px-4 text-lg text-gray-500`} />
        <TextInput
          style={tw`flex-1 text-sm text-gray-500`}
          placeholder="Contraseña"
          placeholderTextColor={phColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!show}
          returnKeyType="go"
          ref={passwordRef}
          onSubmitEditing={handleLogin}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <FontAwesome name={show ? "eye-slash" : "eye"} size={15} style={tw`px-5 text-gray-500`} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`mb-4 mr-3`} onPress={go}>
        <Text style={tw`text-right text-gray-500`}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw`flex items-center bg-green-500 rounded-full p-2 mt-2`} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={tw`font-bold text-white text-base uppercase`}>Ingresar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
