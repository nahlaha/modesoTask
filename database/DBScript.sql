CREATE DATABASE IF NOT EXISTS TaskDb;
USE TaskDb;
CREATE TABLE IF NOT EXISTS Users (
Id INT AUTO_INCREMENT PRIMARY KEY,
UserName NVARCHAR(30) NOT NULL,
Password NVARCHAR(30) NOT NULL,
FullName NVARCHAR(50) NOT NULL,
Email NVARCHAR(50)
);
CREATE TABLE IF NOT EXISTS Notes (
Id INT AUTO_INCREMENT PRIMARY KEY,
Text NVARCHAR(30) NOT NULL,
ImageUrl NVARCHAR(30) NOT NULL,
CreatedBy INT NOT NULL, 
CONSTRAINT FK_UserNote FOREIGN KEY (CreatedBy)
REFERENCES Users(Id)
);
CREATE TABLE IF NOT EXISTS ShardNotes (
Id INT AUTO_INCREMENT PRIMARY KEY,
UserId INT NOT NULL, 
CONSTRAINT FK_UserShardNote FOREIGN KEY (UserId)
REFERENCES Users(Id),
NoteId INT NOT NULL, 
CONSTRAINT FK_NoteShardNote FOREIGN KEY (NoteId)
REFERENCES Notes(Id)
);