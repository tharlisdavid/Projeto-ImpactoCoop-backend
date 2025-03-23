-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialAction" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SocialAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSocialAction" (
    "userId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,

    CONSTRAINT "UserSocialAction_pkey" PRIMARY KEY ("userId","actionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserSocialAction" ADD CONSTRAINT "UserSocialAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSocialAction" ADD CONSTRAINT "UserSocialAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "SocialAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
