import prisma from "../shared/Prisma";

const isUserExist = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return result;
};

export default isUserExist;
