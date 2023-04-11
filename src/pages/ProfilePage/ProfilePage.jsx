import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/features/auth/authSlice";
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Text,
  List,
  ListIcon,
  ListItem,
  Button,
} from "@chakra-ui/react";
import { ManageIcon, CartManager, LogoutIcon } from "../../components/Icons";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const authData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserInfo = useCallback(
    async () => dispatch(fetchUserInfo()).unwrap(),
    []
  );
  useEffect(() => {
    if (!authData.user_id) {
      getUserInfo();
    }
  }, [authData.user_id, getUserInfo]);

  // console.log(authData);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }
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
      <List spacing={3}>
        <ListItem>
          <ListIcon as={ManageIcon} color="green.500" />
          <Button onClick={() => navigate("/profile/address")} variant="ghost">
            Manage Addresses
          </Button>
        </ListItem>
        <ListItem>
          <ListIcon as={CartManager} color="green.500" />
          <Button
            onClick={() => navigate("/profile/vieworders")}
            variant="ghost"
          >
            My Orders
          </Button>
        </ListItem>
        <ListItem>
          <ListIcon as={LogoutIcon} color="green.500" />
          <Button onClick={handleLogout} variant="ghost">
            Logout
          </Button>
        </ListItem>
      </List>
    </Stack>
  );
};

export default ProfilePage;
