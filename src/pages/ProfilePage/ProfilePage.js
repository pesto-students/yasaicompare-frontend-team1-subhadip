import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import { Avatar, Card, CardBody, Stack, Text } from "@chakra-ui/react";

const ProfilePage = () => {
  const authData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const getUserInfo = useCallback(
    async () => dispatch(fetchUserInfo()).unwrap(),
    []
  );
  useEffect(() => {
    getUserInfo();
  }, []);

  // console.log(authData);
  return (
    <Stack p="2">
      {authData && (
        <Card size="sm">
          <CardBody>
            <Stack direction={"row"} alignItems={"center"} gap="2">
              <Stack>
                <Avatar
                  size="md"
                  name={authData.first_name + " " + authData.last_name}
                  src="https://bit.ly/tioluwani-kolawole"
                />
              </Stack>
              <Stack flex="1">
                <Text fontWeight={"bold"} color="gray.600" fontSize={"sm"}>
                  {authData.first_name + " " + authData.last_name}
                </Text>
                <Text fontSize={"xs"}>{authData.email}</Text>
                <Text fontSize={"xs"}>{authData.contact_no || ""}</Text>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      )}
    </Stack>
  );
};

export default ProfilePage;
