-- Trigger 
-- insert PHIEUGUITIEN
use CNPM;
DROP TRIGGER IF EXISTS before_PHIEUGUITIEN_insert;
DELIMITER //
CREATE TRIGGER before_PHIEUGUITIEN_insert
BEFORE INSERT ON PHIEUGUITIEN
FOR EACH ROW
BEGIN
	DECLARE KyHan INT DEFAULT (SELECT `KyHan` FROM `LOAITIETKIEM` WHERE `id` = new.`LTK`);
	SET NEW.`NgayDaoHan` = (SELECT DATE_ADD(NEW.`NgayMoSo`, INTERVAL KyHan DAY));
    SET NEW.`TienDu` = NEW.`TienGoc`;
    IF (SELECT TIMESTAMPDIFF(DAY, NEW.`NgayMoSo`, `NgayApDung`) FROM `LOAITIETKIEM` WHERE `id` = new.`LTK`) > 0 then
		SET NEW.`LaiSuat` = (SELECT `LaiSuatCu` FROM `LOAITIETKIEM` WHERE `id` = NEW.`LTK`);
	ELSE
		SET NEW.`LaiSuat` = (SELECT `LaiSuat` FROM `LOAITIETKIEM` WHERE `id` = NEW.`LTK`);
	END IF;

	IF (NEW.`TienGoc` < (SELECT SoTienGuiBanDauToiThieu FROM  THAMSO)) THEN
		SET NEW.`id` = NULL;
	END IF;

    -- cập nhập lại danh sách báo cáo khi thêm
    IF NOT EXISTS (SELECT * FROM `BAOCAODOANHSO` WHERE `NgayBaoCao` = NEW.`NgayMoSo` AND `LTK` = NEW.`LTK`) then
		INSERT INTO `BAOCAODOANHSO`(LTK, NGAYBAOCAO, TongThu, TongChi, ChenhLech) 
		VALUES (NEW.`LTK`, NEW.`NgayMoSo`, NEW.`TienGoc`, 0, NEW.`TienGoc`);
	ELSE
		UPDATE `BAOCAODOANHSO` 
        SET `TongThu` = `TongThu` + NEW.`TienGoc`, `ChenhLech` = `ChenhLech` + NEW.`TienGoc`
        WHERE `NgayBaoCao` = NEW.`NgayMoSo` AND `LTK` = NEW.`LTK`;
	END IF;
END //
DELIMITER ;

-- update khi đến ngày tính lãi 
DROP TRIGGER IF EXISTS before_PHIEUGUITIEN_update;
DELIMITER //
CREATE TRIGGER before_PHIEUGUITIEN_update
BEFORE UPDATE ON PHIEUGUITIEN
FOR EACH ROW
BEGIN
    DECLARE NgayApDung DATETIME DEFAULT (SELECT `NgayApDung` FROM `LOAITIETKIEM` WHERE `LOAITIETKIEM`.`id` = NEW.`LTK`);
	DECLARE KyHan INT DEFAULT (SELECT `KyHan` FROM `LOAITIETKIEM` WHERE `LOAITIETKIEM`.`id` = NEW.`LTK`);
    DECLARE times int;
	SET times = ceil(TIMESTAMPDIFF(DAY, OLD.`NgayDaoHan`, NEW.`NgayDaoHan`) / KyHan );
	SET NEW.`NgayDaoHan` = DATE_ADD(OLD.`NgayDaoHan`, INTERVAL times*KyHan DAY);
    
	IF (NEW.`NgayDaoHan` < NgayApDung) OR (TIMESTAMPDIFF(DAY, NgayApDung, OLD.`NgayDaoHan`) >= KyHan) OR (TIMESTAMPDIFF(DAY, NgayApDung, NEW.`NgayDaoHan`) < KyHan)  then
		SET new.`TienDu` = new.`TienDu` * (1 + new.`LaiSuat`*times*KyHan/360);
	ELSE
		BEGIN            
			DECLARE TEST INT DEFAULT (floor(TIMESTAMPDIFF(DAY, NgayApDung, NEW.`NgayDaoHan`)/KyHan ) - 1);
			SET NEW.`TienDu` = NEW.`TienDu` * (1 + NEW.`LaiSuat`*(times - TEST)*KyHan/360 );
			SET NEW.`LaiSuat` = (SELECT `LaiSuat` FROM `LOAITIETKIEM` WHERE `id` = NEW.`LTK`);			
			SET NEW.`TienDu` = NEW.`TienDu` * (1 + NEW.`LaiSuat`*TEST*KyHan/360);
		END;
	END IF;
-- cẬP NHẬP BÁO CÁO SỐ DOANH SỐ KHI ĐÓNG SỔ
    IF NEW.`TienDu`= 0.0 and NOT EXISTS
    (
		SELECT * FROM `BAOCAODOANHSO` WHERE `NgayBaoCao` =	NEW.`NgayDongSo` AND `BAOCAODOANHSO`.`LTK` = new.`LTK` 
	) then
		BEGIN
        DECLARE money decimal(60,5);
        SET money = 1 + (SELECT `LaiSuat` from `LOAITIETKIEM` where `id` = '2b008dea89')*( KyHan - timestampdiff(DAY, new.`NgayDongSo`, new.`NgayDaoHan`))/15;
		INSERT INTO `BAOCAODOANHSO`(LTK, NGAYBAOCAO, TongThu, TongChi, ChenhLech) 
        VALUES (new.`LTK`, new.`NgayDongSo`, 0, old.`TienDu`*money, -1*old.`TienDu`*money);
        END;
	ELSEIF new.`TienDu` = 0.0 then
		BEGIN
		DECLARE money decimal(60,5);
        SET money = 1 + (SELECT `LaiSuat` from `LOAITIETKIEM` where `id` = '2b008dea89')*( KyHan - timestampdiff(DAY, new.`NgayDongSo`, new.`NgayDaoHan`))/15;
		UPDATE `BAOCAODOANHSO` 
        SET `TongChi` = `TongChi` + old.`TienDu`*money, `ChenhLech` = `ChenhLech` - old.`TienDu`*money
        WHERE `NgayBaoCao` = new.`NgayDongSo` AND `LTK` = new.`LTK`;
        END;
    END IF;
END //
DELIMITER ;
