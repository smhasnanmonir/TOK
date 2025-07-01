import bcrypt from "bcrypt";
import { UserInterface } from "./user.interface";
import prisma from "../../shared/Prisma";
import isUserExist from "../../middleware/isUserExist";

const userCreateService = async (props: UserInterface) => {
  const salt = process.env.SALT;
  console.log(process.env.SALT);
  console.log(props);
  const hashedPassword: string = await bcrypt.hash(
    props.password,
    Number(salt)
  );
  //   if (await isUserExist(props.email)) {
  //     throw new Error("User already exists!");
  //   }
  const result = await prisma.user.create({
    data: {
      id: props.id,
      name: props.name,
      email: props.email,
      password: hashedPassword,
      role: props.role,
      phone: props.phone,
      address: props.address,
      city: props.city,
      zip: props.zip,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return result;
};

const userFindByEmailService = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return result;
};

export const userService = {
  userCreateService,
  userFindByEmailService,
};
